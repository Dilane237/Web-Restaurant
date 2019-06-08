package com.project.jee.service;

import com.project.jee.domain.Billing;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Billing}.
 */
public interface BillingService {

    /**
     * Save a billing.
     *
     * @param billing the entity to save.
     * @return the persisted entity.
     */
    Billing save(Billing billing);

    /**
     * Get all the billings.
     *
     * @return the list of entities.
     */
    List<Billing> findAll();


    /**
     * Get the "id" billing.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Billing> findOne(Long id);

    /**
     * Delete the "id" billing.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
