package com.project.jee.service;

import com.project.jee.domain.Reservation;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Reservation}.
 */
public interface ReservationService {

    /**
     * Save a reservation.
     *
     * @param reservation the entity to save.
     * @return the persisted entity.
     */
    Reservation save(Reservation reservation);

    /**
     * Get all the reservations.
     *
     * @return the list of entities.
     */
    List<Reservation> findAll();


    /**
     * Get the "id" reservation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Reservation> findOne(Long id);

    /**
     * Delete the "id" reservation.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
