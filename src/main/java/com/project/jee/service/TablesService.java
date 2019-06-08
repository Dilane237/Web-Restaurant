package com.project.jee.service;

import com.project.jee.domain.Tables;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Tables}.
 */
public interface TablesService {

    /**
     * Save a tables.
     *
     * @param tables the entity to save.
     * @return the persisted entity.
     */
    Tables save(Tables tables);

    /**
     * Get all the tables.
     *
     * @return the list of entities.
     */
    List<Tables> findAll();


    /**
     * Get the "id" tables.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Tables> findOne(Long id);

    /**
     * Delete the "id" tables.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
