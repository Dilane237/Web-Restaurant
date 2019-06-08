package com.project.jee.web.rest;

import com.project.jee.domain.TypeOfMenu;
import com.project.jee.service.TypeOfMenuService;
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
 * REST controller for managing {@link com.project.jee.domain.TypeOfMenu}.
 */
@RestController
@RequestMapping("/api")
public class TypeOfMenuResource {

    private final Logger log = LoggerFactory.getLogger(TypeOfMenuResource.class);

    private static final String ENTITY_NAME = "typeOfMenu";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TypeOfMenuService typeOfMenuService;

    public TypeOfMenuResource(TypeOfMenuService typeOfMenuService) {
        this.typeOfMenuService = typeOfMenuService;
    }

    /**
     * {@code POST  /type-of-menus} : Create a new typeOfMenu.
     *
     * @param typeOfMenu the typeOfMenu to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new typeOfMenu, or with status {@code 400 (Bad Request)} if the typeOfMenu has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/type-of-menus")
    public ResponseEntity<TypeOfMenu> createTypeOfMenu(@RequestBody TypeOfMenu typeOfMenu) throws URISyntaxException {
        log.debug("REST request to save TypeOfMenu : {}", typeOfMenu);
        if (typeOfMenu.getId() != null) {
            throw new BadRequestAlertException("A new typeOfMenu cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TypeOfMenu result = typeOfMenuService.save(typeOfMenu);
        return ResponseEntity.created(new URI("/api/type-of-menus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /type-of-menus} : Updates an existing typeOfMenu.
     *
     * @param typeOfMenu the typeOfMenu to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated typeOfMenu,
     * or with status {@code 400 (Bad Request)} if the typeOfMenu is not valid,
     * or with status {@code 500 (Internal Server Error)} if the typeOfMenu couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/type-of-menus")
    public ResponseEntity<TypeOfMenu> updateTypeOfMenu(@RequestBody TypeOfMenu typeOfMenu) throws URISyntaxException {
        log.debug("REST request to update TypeOfMenu : {}", typeOfMenu);
        if (typeOfMenu.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TypeOfMenu result = typeOfMenuService.save(typeOfMenu);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, typeOfMenu.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /type-of-menus} : get all the typeOfMenus.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of typeOfMenus in body.
     */
    @GetMapping("/type-of-menus")
    public List<TypeOfMenu> getAllTypeOfMenus() {
        log.debug("REST request to get all TypeOfMenus");
        return typeOfMenuService.findAll();
    }

    /**
     * {@code GET  /type-of-menus/:id} : get the "id" typeOfMenu.
     *
     * @param id the id of the typeOfMenu to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the typeOfMenu, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/type-of-menus/{id}")
    public ResponseEntity<TypeOfMenu> getTypeOfMenu(@PathVariable Long id) {
        log.debug("REST request to get TypeOfMenu : {}", id);
        Optional<TypeOfMenu> typeOfMenu = typeOfMenuService.findOne(id);
        return ResponseUtil.wrapOrNotFound(typeOfMenu);
    }

    /**
     * {@code DELETE  /type-of-menus/:id} : delete the "id" typeOfMenu.
     *
     * @param id the id of the typeOfMenu to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/type-of-menus/{id}")
    public ResponseEntity<Void> deleteTypeOfMenu(@PathVariable Long id) {
        log.debug("REST request to delete TypeOfMenu : {}", id);
        typeOfMenuService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
