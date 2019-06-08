package com.project.jee.service.impl;

import com.project.jee.service.BillingService;
import com.project.jee.domain.Billing;
import com.project.jee.repository.BillingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Billing}.
 */
@Service
@Transactional
public class BillingServiceImpl implements BillingService {

    private final Logger log = LoggerFactory.getLogger(BillingServiceImpl.class);

    private final BillingRepository billingRepository;

    public BillingServiceImpl(BillingRepository billingRepository) {
        this.billingRepository = billingRepository;
    }

    /**
     * Save a billing.
     *
     * @param billing the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Billing save(Billing billing) {
        log.debug("Request to save Billing : {}", billing);
        return billingRepository.save(billing);
    }

    /**
     * Get all the billings.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Billing> findAll() {
        log.debug("Request to get all Billings");
        return billingRepository.findAll();
    }


    /**
     * Get one billing by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Billing> findOne(Long id) {
        log.debug("Request to get Billing : {}", id);
        return billingRepository.findById(id);
    }

    /**
     * Delete the billing by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Billing : {}", id);
        billingRepository.deleteById(id);
    }
}
