package com.project.jee.repository;

import com.project.jee.domain.Tables;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Tables entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TablesRepository extends JpaRepository<Tables, Long> {

}
