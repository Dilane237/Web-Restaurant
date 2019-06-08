package com.project.jee.service.impl;

import com.project.jee.service.TypeOfMenuService;
import com.project.jee.domain.TypeOfMenu;
import com.project.jee.repository.TypeOfMenuRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link TypeOfMenu}.
 */
@Service
@Transactional
public class TypeOfMenuServiceImpl implements TypeOfMenuService {

    private final Logger log = LoggerFactory.getLogger(TypeOfMenuServiceImpl.class);

    private final TypeOfMenuRepository typeOfMenuRepository;

    public TypeOfMenuServiceImpl(TypeOfMenuRepository typeOfMenuRepository) {
        this.typeOfMenuRepository = typeOfMenuRepository;
    }

    /**
     * Save a typeOfMenu.
     *
     * @param typeOfMenu the entity to save.
     * @return the persisted entity.
     */
    @Override
    public TypeOfMenu save(TypeOfMenu typeOfMenu) {
        log.debug("Request to save TypeOfMenu : {}", typeOfMenu);
        return typeOfMenuRepository.save(typeOfMenu);
    }

    /**
     * Get all the typeOfMenus.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<TypeOfMenu> findAll() {
        log.debug("Request to get all TypeOfMenus");
        return typeOfMenuRepository.findAll();
    }


    /**
     * Get one typeOfMenu by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TypeOfMenu> findOne(Long id) {
        log.debug("Request to get TypeOfMenu : {}", id);
        return typeOfMenuRepository.findById(id);
    }

    /**
     * Delete the typeOfMenu by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TypeOfMenu : {}", id);
        typeOfMenuRepository.deleteById(id);
    }
}
