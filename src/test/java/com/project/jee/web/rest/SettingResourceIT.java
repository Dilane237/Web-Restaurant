package com.project.jee.web.rest;

import com.project.jee.RestaurantApp;
import com.project.jee.domain.Setting;
import com.project.jee.repository.SettingRepository;
import com.project.jee.service.SettingService;
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
 * Integration tests for the {@Link SettingResource} REST controller.
 */
@SpringBootTest(classes = RestaurantApp.class)
public class SettingResourceIT {

    private static final String DEFAULT_RESTAURANT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_RESTAURANT_NAME = "BBBBBBBBBB";

    private static final Long DEFAULT_NUMBER_OF_TABLE = 1L;
    private static final Long UPDATED_NUMBER_OF_TABLE = 2L;

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final Long DEFAULT_NUMBER_PERSON_TABLE = 1L;
    private static final Long UPDATED_NUMBER_PERSON_TABLE = 2L;

    @Autowired
    private SettingRepository settingRepository;

    @Autowired
    private SettingService settingService;

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

    private MockMvc restSettingMockMvc;

    private Setting setting;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SettingResource settingResource = new SettingResource(settingService);
        this.restSettingMockMvc = MockMvcBuilders.standaloneSetup(settingResource)
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
    public static Setting createEntity(EntityManager em) {
        Setting setting = new Setting()
            .restaurantName(DEFAULT_RESTAURANT_NAME)
            .numberOfTable(DEFAULT_NUMBER_OF_TABLE)
            .address(DEFAULT_ADDRESS)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .numberPersonTable(DEFAULT_NUMBER_PERSON_TABLE);
        return setting;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Setting createUpdatedEntity(EntityManager em) {
        Setting setting = new Setting()
            .restaurantName(UPDATED_RESTAURANT_NAME)
            .numberOfTable(UPDATED_NUMBER_OF_TABLE)
            .address(UPDATED_ADDRESS)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .numberPersonTable(UPDATED_NUMBER_PERSON_TABLE);
        return setting;
    }

    @BeforeEach
    public void initTest() {
        setting = createEntity(em);
    }

    @Test
    @Transactional
    public void createSetting() throws Exception {
        int databaseSizeBeforeCreate = settingRepository.findAll().size();

        // Create the Setting
        restSettingMockMvc.perform(post("/api/settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(setting)))
            .andExpect(status().isCreated());

        // Validate the Setting in the database
        List<Setting> settingList = settingRepository.findAll();
        assertThat(settingList).hasSize(databaseSizeBeforeCreate + 1);
        Setting testSetting = settingList.get(settingList.size() - 1);
        assertThat(testSetting.getRestaurantName()).isEqualTo(DEFAULT_RESTAURANT_NAME);
        assertThat(testSetting.getNumberOfTable()).isEqualTo(DEFAULT_NUMBER_OF_TABLE);
        assertThat(testSetting.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testSetting.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testSetting.getNumberPersonTable()).isEqualTo(DEFAULT_NUMBER_PERSON_TABLE);
    }

    @Test
    @Transactional
    public void createSettingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = settingRepository.findAll().size();

        // Create the Setting with an existing ID
        setting.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSettingMockMvc.perform(post("/api/settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(setting)))
            .andExpect(status().isBadRequest());

        // Validate the Setting in the database
        List<Setting> settingList = settingRepository.findAll();
        assertThat(settingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSettings() throws Exception {
        // Initialize the database
        settingRepository.saveAndFlush(setting);

        // Get all the settingList
        restSettingMockMvc.perform(get("/api/settings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(setting.getId().intValue())))
            .andExpect(jsonPath("$.[*].restaurantName").value(hasItem(DEFAULT_RESTAURANT_NAME.toString())))
            .andExpect(jsonPath("$.[*].numberOfTable").value(hasItem(DEFAULT_NUMBER_OF_TABLE.intValue())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].numberPersonTable").value(hasItem(DEFAULT_NUMBER_PERSON_TABLE.intValue())));
    }
    
    @Test
    @Transactional
    public void getSetting() throws Exception {
        // Initialize the database
        settingRepository.saveAndFlush(setting);

        // Get the setting
        restSettingMockMvc.perform(get("/api/settings/{id}", setting.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(setting.getId().intValue()))
            .andExpect(jsonPath("$.restaurantName").value(DEFAULT_RESTAURANT_NAME.toString()))
            .andExpect(jsonPath("$.numberOfTable").value(DEFAULT_NUMBER_OF_TABLE.intValue()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER.toString()))
            .andExpect(jsonPath("$.numberPersonTable").value(DEFAULT_NUMBER_PERSON_TABLE.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSetting() throws Exception {
        // Get the setting
        restSettingMockMvc.perform(get("/api/settings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSetting() throws Exception {
        // Initialize the database
        settingService.save(setting);

        int databaseSizeBeforeUpdate = settingRepository.findAll().size();

        // Update the setting
        Setting updatedSetting = settingRepository.findById(setting.getId()).get();
        // Disconnect from session so that the updates on updatedSetting are not directly saved in db
        em.detach(updatedSetting);
        updatedSetting
            .restaurantName(UPDATED_RESTAURANT_NAME)
            .numberOfTable(UPDATED_NUMBER_OF_TABLE)
            .address(UPDATED_ADDRESS)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .numberPersonTable(UPDATED_NUMBER_PERSON_TABLE);

        restSettingMockMvc.perform(put("/api/settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSetting)))
            .andExpect(status().isOk());

        // Validate the Setting in the database
        List<Setting> settingList = settingRepository.findAll();
        assertThat(settingList).hasSize(databaseSizeBeforeUpdate);
        Setting testSetting = settingList.get(settingList.size() - 1);
        assertThat(testSetting.getRestaurantName()).isEqualTo(UPDATED_RESTAURANT_NAME);
        assertThat(testSetting.getNumberOfTable()).isEqualTo(UPDATED_NUMBER_OF_TABLE);
        assertThat(testSetting.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testSetting.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testSetting.getNumberPersonTable()).isEqualTo(UPDATED_NUMBER_PERSON_TABLE);
    }

    @Test
    @Transactional
    public void updateNonExistingSetting() throws Exception {
        int databaseSizeBeforeUpdate = settingRepository.findAll().size();

        // Create the Setting

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSettingMockMvc.perform(put("/api/settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(setting)))
            .andExpect(status().isBadRequest());

        // Validate the Setting in the database
        List<Setting> settingList = settingRepository.findAll();
        assertThat(settingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSetting() throws Exception {
        // Initialize the database
        settingService.save(setting);

        int databaseSizeBeforeDelete = settingRepository.findAll().size();

        // Delete the setting
        restSettingMockMvc.perform(delete("/api/settings/{id}", setting.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Setting> settingList = settingRepository.findAll();
        assertThat(settingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Setting.class);
        Setting setting1 = new Setting();
        setting1.setId(1L);
        Setting setting2 = new Setting();
        setting2.setId(setting1.getId());
        assertThat(setting1).isEqualTo(setting2);
        setting2.setId(2L);
        assertThat(setting1).isNotEqualTo(setting2);
        setting1.setId(null);
        assertThat(setting1).isNotEqualTo(setting2);
    }
}
