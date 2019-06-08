package com.project.jee.web.rest;

import com.project.jee.RestaurantApp;
import com.project.jee.domain.TypeOfMenu;
import com.project.jee.repository.TypeOfMenuRepository;
import com.project.jee.service.TypeOfMenuService;
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
 * Integration tests for the {@Link TypeOfMenuResource} REST controller.
 */
@SpringBootTest(classes = RestaurantApp.class)
public class TypeOfMenuResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private TypeOfMenuRepository typeOfMenuRepository;

    @Autowired
    private TypeOfMenuService typeOfMenuService;

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

    private MockMvc restTypeOfMenuMockMvc;

    private TypeOfMenu typeOfMenu;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TypeOfMenuResource typeOfMenuResource = new TypeOfMenuResource(typeOfMenuService);
        this.restTypeOfMenuMockMvc = MockMvcBuilders.standaloneSetup(typeOfMenuResource)
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
    public static TypeOfMenu createEntity(EntityManager em) {
        TypeOfMenu typeOfMenu = new TypeOfMenu()
            .name(DEFAULT_NAME);
        return typeOfMenu;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeOfMenu createUpdatedEntity(EntityManager em) {
        TypeOfMenu typeOfMenu = new TypeOfMenu()
            .name(UPDATED_NAME);
        return typeOfMenu;
    }

    @BeforeEach
    public void initTest() {
        typeOfMenu = createEntity(em);
    }

    @Test
    @Transactional
    public void createTypeOfMenu() throws Exception {
        int databaseSizeBeforeCreate = typeOfMenuRepository.findAll().size();

        // Create the TypeOfMenu
        restTypeOfMenuMockMvc.perform(post("/api/type-of-menus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeOfMenu)))
            .andExpect(status().isCreated());

        // Validate the TypeOfMenu in the database
        List<TypeOfMenu> typeOfMenuList = typeOfMenuRepository.findAll();
        assertThat(typeOfMenuList).hasSize(databaseSizeBeforeCreate + 1);
        TypeOfMenu testTypeOfMenu = typeOfMenuList.get(typeOfMenuList.size() - 1);
        assertThat(testTypeOfMenu.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createTypeOfMenuWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = typeOfMenuRepository.findAll().size();

        // Create the TypeOfMenu with an existing ID
        typeOfMenu.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTypeOfMenuMockMvc.perform(post("/api/type-of-menus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeOfMenu)))
            .andExpect(status().isBadRequest());

        // Validate the TypeOfMenu in the database
        List<TypeOfMenu> typeOfMenuList = typeOfMenuRepository.findAll();
        assertThat(typeOfMenuList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTypeOfMenus() throws Exception {
        // Initialize the database
        typeOfMenuRepository.saveAndFlush(typeOfMenu);

        // Get all the typeOfMenuList
        restTypeOfMenuMockMvc.perform(get("/api/type-of-menus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeOfMenu.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getTypeOfMenu() throws Exception {
        // Initialize the database
        typeOfMenuRepository.saveAndFlush(typeOfMenu);

        // Get the typeOfMenu
        restTypeOfMenuMockMvc.perform(get("/api/type-of-menus/{id}", typeOfMenu.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(typeOfMenu.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTypeOfMenu() throws Exception {
        // Get the typeOfMenu
        restTypeOfMenuMockMvc.perform(get("/api/type-of-menus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTypeOfMenu() throws Exception {
        // Initialize the database
        typeOfMenuService.save(typeOfMenu);

        int databaseSizeBeforeUpdate = typeOfMenuRepository.findAll().size();

        // Update the typeOfMenu
        TypeOfMenu updatedTypeOfMenu = typeOfMenuRepository.findById(typeOfMenu.getId()).get();
        // Disconnect from session so that the updates on updatedTypeOfMenu are not directly saved in db
        em.detach(updatedTypeOfMenu);
        updatedTypeOfMenu
            .name(UPDATED_NAME);

        restTypeOfMenuMockMvc.perform(put("/api/type-of-menus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTypeOfMenu)))
            .andExpect(status().isOk());

        // Validate the TypeOfMenu in the database
        List<TypeOfMenu> typeOfMenuList = typeOfMenuRepository.findAll();
        assertThat(typeOfMenuList).hasSize(databaseSizeBeforeUpdate);
        TypeOfMenu testTypeOfMenu = typeOfMenuList.get(typeOfMenuList.size() - 1);
        assertThat(testTypeOfMenu.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingTypeOfMenu() throws Exception {
        int databaseSizeBeforeUpdate = typeOfMenuRepository.findAll().size();

        // Create the TypeOfMenu

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTypeOfMenuMockMvc.perform(put("/api/type-of-menus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeOfMenu)))
            .andExpect(status().isBadRequest());

        // Validate the TypeOfMenu in the database
        List<TypeOfMenu> typeOfMenuList = typeOfMenuRepository.findAll();
        assertThat(typeOfMenuList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTypeOfMenu() throws Exception {
        // Initialize the database
        typeOfMenuService.save(typeOfMenu);

        int databaseSizeBeforeDelete = typeOfMenuRepository.findAll().size();

        // Delete the typeOfMenu
        restTypeOfMenuMockMvc.perform(delete("/api/type-of-menus/{id}", typeOfMenu.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<TypeOfMenu> typeOfMenuList = typeOfMenuRepository.findAll();
        assertThat(typeOfMenuList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TypeOfMenu.class);
        TypeOfMenu typeOfMenu1 = new TypeOfMenu();
        typeOfMenu1.setId(1L);
        TypeOfMenu typeOfMenu2 = new TypeOfMenu();
        typeOfMenu2.setId(typeOfMenu1.getId());
        assertThat(typeOfMenu1).isEqualTo(typeOfMenu2);
        typeOfMenu2.setId(2L);
        assertThat(typeOfMenu1).isNotEqualTo(typeOfMenu2);
        typeOfMenu1.setId(null);
        assertThat(typeOfMenu1).isNotEqualTo(typeOfMenu2);
    }
}
