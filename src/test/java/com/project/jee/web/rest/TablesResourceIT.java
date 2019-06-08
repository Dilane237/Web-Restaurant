package com.project.jee.web.rest;

import com.project.jee.RestaurantApp;
import com.project.jee.domain.Tables;
import com.project.jee.repository.TablesRepository;
import com.project.jee.service.TablesService;
import com.project.jee.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.project.jee.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link TablesResource} REST controller.
 */
@SpringBootTest(classes = RestaurantApp.class)
public class TablesResourceIT {

    private static final Long DEFAULT_PLACES_AVAILABLE = 1L;
    private static final Long UPDATED_PLACES_AVAILABLE = 2L;

    private static final Boolean DEFAULT_IS_RESERVED = false;
    private static final Boolean UPDATED_IS_RESERVED = true;

    private static final Long DEFAULT_USER = 1L;
    private static final Long UPDATED_USER = 2L;

    @Autowired
    private TablesRepository tablesRepository;

    @Autowired
    private TablesService tablesService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTablesMockMvc;

    private Tables tables;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TablesResource tablesResource = new TablesResource(tablesService);
        this.restTablesMockMvc = MockMvcBuilders.standaloneSetup(tablesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tables createEntity(EntityManager em) {
        Tables tables = new Tables()
            .placesAvailable(DEFAULT_PLACES_AVAILABLE)
            .isReserved(DEFAULT_IS_RESERVED)
            .user(DEFAULT_USER);
        return tables;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tables createUpdatedEntity(EntityManager em) {
        Tables tables = new Tables()
            .placesAvailable(UPDATED_PLACES_AVAILABLE)
            .isReserved(UPDATED_IS_RESERVED)
            .user(UPDATED_USER);
        return tables;
    }

    @BeforeEach
    public void initTest() {
        tables = createEntity(em);
    }

    @Test
    @Transactional
    public void createTables() throws Exception {
        int databaseSizeBeforeCreate = tablesRepository.findAll().size();

        // Create the Tables
        restTablesMockMvc.perform(post("/api/tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tables)))
            .andExpect(status().isCreated());

        // Validate the Tables in the database
        List<Tables> tablesList = tablesRepository.findAll();
        assertThat(tablesList).hasSize(databaseSizeBeforeCreate + 1);
        Tables testTables = tablesList.get(tablesList.size() - 1);
        assertThat(testTables.getPlacesAvailable()).isEqualTo(DEFAULT_PLACES_AVAILABLE);
        assertThat(testTables.isIsReserved()).isEqualTo(DEFAULT_IS_RESERVED);
        assertThat(testTables.getUser()).isEqualTo(DEFAULT_USER);
    }

    @Test
    @Transactional
    public void createTablesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tablesRepository.findAll().size();

        // Create the Tables with an existing ID
        tables.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTablesMockMvc.perform(post("/api/tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tables)))
            .andExpect(status().isBadRequest());

        // Validate the Tables in the database
        List<Tables> tablesList = tablesRepository.findAll();
        assertThat(tablesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTables() throws Exception {
        // Initialize the database
        tablesRepository.saveAndFlush(tables);

        // Get all the tablesList
        restTablesMockMvc.perform(get("/api/tables?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tables.getId().intValue())))
            .andExpect(jsonPath("$.[*].placesAvailable").value(hasItem(DEFAULT_PLACES_AVAILABLE.intValue())))
            .andExpect(jsonPath("$.[*].isReserved").value(hasItem(DEFAULT_IS_RESERVED.booleanValue())))
            .andExpect(jsonPath("$.[*].user").value(hasItem(DEFAULT_USER.intValue())));
    }
    
    @Test
    @Transactional
    public void getTables() throws Exception {
        // Initialize the database
        tablesRepository.saveAndFlush(tables);

        // Get the tables
        restTablesMockMvc.perform(get("/api/tables/{id}", tables.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tables.getId().intValue()))
            .andExpect(jsonPath("$.placesAvailable").value(DEFAULT_PLACES_AVAILABLE.intValue()))
            .andExpect(jsonPath("$.isReserved").value(DEFAULT_IS_RESERVED.booleanValue()))
            .andExpect(jsonPath("$.user").value(DEFAULT_USER.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTables() throws Exception {
        // Get the tables
        restTablesMockMvc.perform(get("/api/tables/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTables() throws Exception {
        // Initialize the database
        tablesService.save(tables);

        int databaseSizeBeforeUpdate = tablesRepository.findAll().size();

        // Update the tables
        Tables updatedTables = tablesRepository.findById(tables.getId()).get();
        // Disconnect from session so that the updates on updatedTables are not directly saved in db
        em.detach(updatedTables);
        updatedTables
            .placesAvailable(UPDATED_PLACES_AVAILABLE)
            .isReserved(UPDATED_IS_RESERVED)
            .user(UPDATED_USER);

        restTablesMockMvc.perform(put("/api/tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTables)))
            .andExpect(status().isOk());

        // Validate the Tables in the database
        List<Tables> tablesList = tablesRepository.findAll();
        assertThat(tablesList).hasSize(databaseSizeBeforeUpdate);
        Tables testTables = tablesList.get(tablesList.size() - 1);
        assertThat(testTables.getPlacesAvailable()).isEqualTo(UPDATED_PLACES_AVAILABLE);
        assertThat(testTables.isIsReserved()).isEqualTo(UPDATED_IS_RESERVED);
        assertThat(testTables.getUser()).isEqualTo(UPDATED_USER);
    }

    @Test
    @Transactional
    public void updateNonExistingTables() throws Exception {
        int databaseSizeBeforeUpdate = tablesRepository.findAll().size();

        // Create the Tables

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTablesMockMvc.perform(put("/api/tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tables)))
            .andExpect(status().isBadRequest());

        // Validate the Tables in the database
        List<Tables> tablesList = tablesRepository.findAll();
        assertThat(tablesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTables() throws Exception {
        // Initialize the database
        tablesService.save(tables);

        int databaseSizeBeforeDelete = tablesRepository.findAll().size();

        // Delete the tables
        restTablesMockMvc.perform(delete("/api/tables/{id}", tables.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Tables> tablesList = tablesRepository.findAll();
        assertThat(tablesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tables.class);
        Tables tables1 = new Tables();
        tables1.setId(1L);
        Tables tables2 = new Tables();
        tables2.setId(tables1.getId());
        assertThat(tables1).isEqualTo(tables2);
        tables2.setId(2L);
        assertThat(tables1).isNotEqualTo(tables2);
        tables1.setId(null);
        assertThat(tables1).isNotEqualTo(tables2);
    }
}
