package com.project.jee.service.impl;

import com.project.jee.service.TablesService;
import com.project.jee.domain.Tables;
import com.project.jee.repository.TablesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Tables}.
 */
@Service
@Transactional
public class TablesServiceImpl implements TablesService {

    private final Logger log = LoggerFactory.getLogger(TablesServiceImpl.class);

    private final TablesRepository tablesRepository;

    public TablesServiceImpl(TablesRepository tablesRepository) {
        this.tablesRepository = tablesRepository;
    }

    /**
     * Save a tables.
     *
     * @param tables the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Tables save(Tables tables) {
        log.debug("Request to save Tables : {}", tables);
        return tablesRepository.save(tables);
    }

    /**
     * Get all the tables.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Tables> findAll() {
        log.debug("Request to get all Tables");
        return tablesRepository.findAll();
    }


    /**
     * Get one tables by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Tables> findOne(Long id) {
        log.debug("Request to get Tables : {}", id);
        return tablesRepository.findById(id);
    }

    /**
     * Delete the tables by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Tables : {}", id);
        tablesRepository.deleteById(id);
    }
}
