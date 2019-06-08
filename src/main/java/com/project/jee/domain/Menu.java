package com.project.jee.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Menu.
 */
@Entity
@Table(name = "menu")
public class Menu implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "image")
    private String image;

    @Column(name = "price")
    private Long price;

    @ManyToOne
    @JsonIgnoreProperties("menus")
    private Command command;

    @ManyToOne
    @JsonIgnoreProperties("menus")
    private TypeOfMenu typeOfMenu;

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

    public Menu name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public Menu image(String image) {
        this.image = image;
        return this;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Long getPrice() {
        return price;
    }

    public Menu price(Long price) {
        this.price = price;
        return this;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Command getCommand() {
        return command;
    }

    public Menu command(Command command) {
        this.command = command;
        return this;
    }

    public void setCommand(Command command) {
        this.command = command;
    }

    public TypeOfMenu getTypeOfMenu() {
        return typeOfMenu;
    }

    public Menu typeOfMenu(TypeOfMenu typeOfMenu) {
        this.typeOfMenu = typeOfMenu;
        return this;
    }

    public void setTypeOfMenu(TypeOfMenu typeOfMenu) {
        this.typeOfMenu = typeOfMenu;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Menu)) {
            return false;
        }
        return id != null && id.equals(((Menu) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Menu{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", image='" + getImage() + "'" +
            ", price=" + getPrice() +
            "}";
    }
}
