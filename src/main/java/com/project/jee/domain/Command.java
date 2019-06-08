package com.project.jee.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Command.
 */
@Entity
@Table(name = "command")
public class Command implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "command_at")
    private Instant commandAt;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "serve")
    private Boolean serve;

    @ManyToOne
    @JsonIgnoreProperties("commands")
    private Customer customer;

    @OneToMany(mappedBy = "command")
    private Set<Menu> commands = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCommandAt() {
        return commandAt;
    }

    public Command commandAt(Instant commandAt) {
        this.commandAt = commandAt;
        return this;
    }

    public void setCommandAt(Instant commandAt) {
        this.commandAt = commandAt;
    }

    public Long getQuantity() {
        return quantity;
    }

    public Command quantity(Long quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Boolean isServe() {
        return serve;
    }

    public Command serve(Boolean serve) {
        this.serve = serve;
        return this;
    }

    public void setServe(Boolean serve) {
        this.serve = serve;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Command customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Set<Menu> getCommands() {
        return commands;
    }

    public Command commands(Set<Menu> menus) {
        this.commands = menus;
        return this;
    }

    public Command addCommand(Menu menu) {
        this.commands.add(menu);
        menu.setCommand(this);
        return this;
    }

    public Command removeCommand(Menu menu) {
        this.commands.remove(menu);
        menu.setCommand(null);
        return this;
    }

    public void setCommands(Set<Menu> menus) {
        this.commands = menus;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Command)) {
            return false;
        }
        return id != null && id.equals(((Command) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Command{" +
            "id=" + getId() +
            ", commandAt='" + getCommandAt() + "'" +
            ", quantity=" + getQuantity() +
            ", serve='" + isServe() + "'" +
            "}";
    }
}
