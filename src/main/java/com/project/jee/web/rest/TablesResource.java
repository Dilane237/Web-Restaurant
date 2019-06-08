package com.project.jee.web.rest;

import com.project.jee.domain.Tables;
import com.project.jee.service.TablesService;
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
 * REST controller for managing {@link com.project.jee.domain.Tables}.
 */
@RestController
@RequestMapping("/api")
public class TablesResource {

    private final Logger log = LoggerFactory.getLogger(TablesResource.class);

    private static final String ENTITY_NAME = "tables";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TablesService tablesService;

    public TablesResource(TablesService tablesService) {
        this.tablesService = tablesService;
    }

    /**
     * {@code POST  /tables} : Create a new tables.
     *
     * @param tables the tables to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tables, or with status {@code 400 (Bad Request)} if the tables has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tables")
    public ResponseEntity<Tables> createTables(@RequestBody Tables tables) throws URISyntaxException {
        log.debug("REST request to save Tables : {}", tables);
        if (tables.getId() != null) {
            throw new BadRequestAlertException("A new tables cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tables result = tablesService.save(tables);
        return ResponseEntity.created(new URI("/api/tables/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tables} : Updates an existing tables.
     *
     * @param tables the tables to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tables,
     * or with status {@code 400 (Bad Request)} if the tables is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tables couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tables")
    public ResponseEntity<Tables> updateTables(@RequestBody Tables tables) throws URISyntaxException {
        log.debug("REST request to update Tables : {}", tables);
        if (tables.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Tables result = tablesService.save(tables);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tables.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tables} : get all the tables.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tables in body.
     */
    @GetMapping("/tables")
    public List<Tables> getAllTables() {
        log.debug("REST request to get all Tables");
        return tablesService.findAll();
    }

    /**
     * {@code GET  /tables/:id} : get the "id" tables.
     *
     * @param id the id of the tables to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tables, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tables/{id}")
    public ResponseEntity<Tables> getTables(@PathVariable Long id) {
        log.debug("REST request to get Tables : {}", id);
        Optional<Tables> tables = tablesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tables);
    }

    /**
     * {@code DELETE  /tables/:id} : delete the "id" tables.
     *
     * @param id the id of the tables to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tables/{id}")
    public ResponseEntity<Void> deleteTables(@PathVariable Long id) {
        log.debug("REST request to delete Tables : {}", id);
        tablesService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
