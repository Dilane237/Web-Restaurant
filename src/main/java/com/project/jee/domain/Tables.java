package com.project.jee.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Tables.
 */
@Entity
@Table(name = "tables")
public class Tables implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "places_available")
    private Long placesAvailable;

    @Column(name = "is_reserved")
    private Boolean isReserved;

    @Column(name = "jhi_user")
    private Long user;

    @OneToMany(mappedBy = "tables")
    private Set<Customer> customers = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("tables")
    private Setting setting;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPlacesAvailable() {
        return placesAvailable;
    }

    public Tables placesAvailable(Long placesAvailable) {
        this.placesAvailable = placesAvailable;
        return this;
    }

    public void setPlacesAvailable(Long placesAvailable) {
        this.placesAvailable = placesAvailable;
    }

    public Boolean isIsReserved() {
        return isReserved;
    }

    public Tables isReserved(Boolean isReserved) {
        this.isReserved = isReserved;
        return this;
    }

    public void setIsReserved(Boolean isReserved) {
        this.isReserved = isReserved;
    }

    public Long getUser() {
        return user;
    }

    public Tables user(Long user) {
        this.user = user;
        return this;
    }

    public void setUser(Long user) {
        this.user = user;
    }

    public Set<Customer> getCustomers() {
        return customers;
    }

    public Tables customers(Set<Customer> customers) {
        this.customers = customers;
        return this;
    }

    public Tables addCustomer(Customer customer) {
        this.customers.add(customer);
        customer.setTables(this);
        return this;
    }

    public Tables removeCustomer(Customer customer) {
        this.customers.remove(customer);
        customer.setTables(null);
        return this;
    }

    public void setCustomers(Set<Customer> customers) {
        this.customers = customers;
    }

    public Setting getSetting() {
        return setting;
    }

    public Tables setting(Setting setting) {
        this.setting = setting;
        return this;
    }

    public void setSetting(Setting setting) {
        this.setting = setting;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tables)) {
            return false;
        }
        return id != null && id.equals(((Tables) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Tables{" +
            "id=" + getId() +
            ", placesAvailable=" + getPlacesAvailable() +
            ", isReserved='" + isIsReserved() + "'" +
            ", user=" + getUser() +
            "}";
    }
}
