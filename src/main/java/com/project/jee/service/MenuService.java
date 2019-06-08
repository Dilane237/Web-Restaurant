package com.project.jee.service;

import com.project.jee.domain.Menu;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Menu}.
 */
public interface MenuService {

    /**
     * Save a menu.
     *
     * @param menu the entity to save.
     * @return the persisted entity.
     */
    Menu save(Menu menu);

    /**
     * Get all the menus.
     *
     * @return the list of entities.
     */
    List<Menu> findAll();


    /**
     * Get the "id" menu.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Menu> findOne(Long id);

    /**
     * Delete the "id" menu.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
