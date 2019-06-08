package com.project.jee.service;

import com.project.jee.domain.TypeOfMenu;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link TypeOfMenu}.
 */
public interface TypeOfMenuService {

    /**
     * Save a typeOfMenu.
     *
     * @param typeOfMenu the entity to save.
     * @return the persisted entity.
     */
    TypeOfMenu save(TypeOfMenu typeOfMenu);

    /**
     * Get all the typeOfMenus.
     *
     * @return the list of entities.
     */
    List<TypeOfMenu> findAll();


    /**
     * Get the "id" typeOfMenu.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TypeOfMenu> findOne(Long id);

    /**
     * Delete the "id" typeOfMenu.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
