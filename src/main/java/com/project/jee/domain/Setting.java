package com.project.jee.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Setting.
 */
@Entity
@Table(name = "setting")
public class Setting implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "restaurant_name")
    private String restaurantName;

    @Column(name = "number_of_table")
    private Long numberOfTable;

    @Column(name = "address")
    private String address;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "number_person_table")
    private Long numberPersonTable;

    @OneToMany(mappedBy = "setting")
    private Set<Tables> tables = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public Setting restaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
        return this;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public Long getNumberOfTable() {
        return numberOfTable;
    }

    public Setting numberOfTable(Long numberOfTable) {
        this.numberOfTable = numberOfTable;
        return this;
    }

    public void setNumberOfTable(Long numberOfTable) {
        this.numberOfTable = numberOfTable;
    }

    public String getAddress() {
        return address;
    }

    public Setting address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Setting phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Long getNumberPersonTable() {
        return numberPersonTable;
    }

    public Setting numberPersonTable(Long numberPersonTable) {
        this.numberPersonTable = numberPersonTable;
        return this;
    }

    public void setNumberPersonTable(Long numberPersonTable) {
        this.numberPersonTable = numberPersonTable;
    }

    public Set<Tables> getTables() {
        return tables;
    }

    public Setting tables(Set<Tables> tables) {
        this.tables = tables;
        return this;
    }

    public Setting addTables(Tables tables) {
        this.tables.add(tables);
        tables.setSetting(this);
        return this;
    }

    public Setting removeTables(Tables tables) {
        this.tables.remove(tables);
        tables.setSetting(null);
        return this;
    }

    public void setTables(Set<Tables> tables) {
        this.tables = tables;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Setting)) {
            return false;
        }
        return id != null && id.equals(((Setting) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Setting{" +
            "id=" + getId() +
            ", restaurantName='" + getRestaurantName() + "'" +
            ", numberOfTable=" + getNumberOfTable() +
            ", address='" + getAddress() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", numberPersonTable=" + getNumberPersonTable() +
            "}";
    }
}
