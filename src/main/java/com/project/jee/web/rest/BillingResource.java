package com.project.jee.web.rest;

import com.project.jee.domain.Billing;
import com.project.jee.service.BillingService;
import com.project.jee.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.project.jee.domain.Billing}.
 */
@RestController
@RequestMapping("/api")
public class BillingResource {

    private final Logger log = LoggerFactory.getLogger(BillingResource.class);

    private static final String ENTITY_NAME = "billing";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BillingService billingService;

    public BillingResource(BillingService billingService) {
        this.billingService = billingService;
    }

    /**
     * {@code POST  /billings} : Create a new billing.
     *
     * @param billing the billing to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new billing, or with status {@code 400 (Bad Request)} if the billing has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/billings")
    public ResponseEntity<Billing> createBilling(@RequestBody Billing billing) throws URISyntaxException {
        log.debug("REST request to save Billing : {}", billing);
        if (billing.getId() != null) {
            throw new BadRequestAlertException("A new billing cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Billing result = billingService.save(billing);
        return ResponseEntity.created(new URI("/api/billings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /billings} : Updates an existing billing.
     *
     * @param billing the billing to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated billing,
     * or with status {@code 400 (Bad Request)} if the billing is not valid,
     * or with status {@code 500 (Internal Server Error)} if the billing couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/billings")
    public ResponseEntity<Billing> updateBilling(@RequestBody Billing billing) throws URISyntaxException {
        log.debug("REST request to update Billing : {}", billing);
        if (billing.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Billing result = billingService.save(billing);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, billing.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /billings} : get all the billings.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of billings in body.
     */
    @GetMapping("/billings")
    public List<Billing> getAllBillings() {
        log.debug("REST request to get all Billings");
        return billingService.findAll();
    }

    /**
     * {@code GET  /billings/:id} : get the "id" billing.
     *
     * @param id the id of the billing to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the billing, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/billings/{id}")
    public ResponseEntity<Billing> getBilling(@PathVariable Long id) {
        log.debug("REST request to get Billing : {}", id);
        Optional<Billing> billing = billingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(billing);
    }

    /**
     * {@code DELETE  /billings/:id} : delete the "id" billing.
     *
     * @param id the id of the billing to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/billings/{id}")
    public ResponseEntity<Void> deleteBilling(@PathVariable Long id) {
        log.debug("REST request to delete Billing : {}", id);
        billingService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
