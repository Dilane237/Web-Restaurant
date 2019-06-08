package com.project.jee.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Billing.
 */
@Entity
@Table(name = "billing")
public class Billing implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "total_price")
    private Long totalPrice;

    @Column(name = "status")
    private Boolean status;

    @ManyToOne
    @JsonIgnoreProperties("billings")
    private Customer customer;

    @OneToOne
    @JoinColumn(unique = true)
    private Command command;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTotalPrice() {
        return totalPrice;
    }

    public Billing totalPrice(Long totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }

    public void setTotalPrice(Long totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Boolean isStatus() {
        return status;
    }

    public Billing status(Boolean status) {
        this.status = status;
        return this;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Billing customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Command getCommand() {
        return command;
    }

    public Billing command(Command command) {
        this.command = command;
        return this;
    }

    public void setCommand(Command command) {
        this.command = command;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Billing)) {
            return false;
        }
        return id != null && id.equals(((Billing) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Billing{" +
            "id=" + getId() +
            ", totalPrice=" + getTotalPrice() +
            ", status='" + isStatus() + "'" +
            "}";
    }
}
