package com.project.jee.repository;

import com.project.jee.domain.Billing;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Billing entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BillingRepository extends JpaRepository<Billing, Long> {

}
