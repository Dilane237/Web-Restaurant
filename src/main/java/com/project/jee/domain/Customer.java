package com.project.jee.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Customer.
 */
@Entity
@Table(name = "customer")
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "customer")
    private Set<Command> commands = new HashSet<>();

    @OneToMany(mappedBy = "customer")
    private Set<Billing> billings = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("customers")
    private Tables tables;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Customer name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Command> getCommands() {
        return commands;
    }

    public Customer commands(Set<Command> commands) {
        this.commands = commands;
        return this;
    }

    public Customer addCommand(Command command) {
        this.commands.add(command);
        command.setCustomer(this);
        return this;
    }

    public Customer removeCommand(Command command) {
        this.commands.remove(command);
        command.setCustomer(null);
        return this;
    }

    public void setCommands(Set<Command> commands) {
        this.commands = commands;
    }

    public Set<Billing> getBillings() {
        return billings;
    }

    public Customer billings(Set<Billing> billings) {
        this.billings = billings;
        return this;
    }

    public Customer addBilling(Billing billing) {
        this.billings.add(billing);
        billing.setCustomer(this);
        return this;
    }

    public Customer removeBilling(Billing billing) {
        this.billings.remove(billing);
        billing.setCustomer(null);
        return this;
    }

    public void setBillings(Set<Billing> billings) {
        this.billings = billings;
    }

    public Tables getTables() {
        return tables;
    }

    public Customer tables(Tables tables) {
        this.tables = tables;
        return this;
    }

    public void setTables(Tables tables) {
        this.tables = tables;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Customer)) {
            return false;
        }
        return id != null && id.equals(((Customer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
