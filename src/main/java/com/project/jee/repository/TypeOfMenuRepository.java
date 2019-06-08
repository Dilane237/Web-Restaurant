package com.project.jee.repository;

import com.project.jee.domain.TypeOfMenu;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TypeOfMenu entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeOfMenuRepository extends JpaRepository<TypeOfMenu, Long> {

}
