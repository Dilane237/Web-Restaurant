package com.project.jee.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TypeOfMenu.
 */
@Entity
@Table(name = "type_of_menu")
public class TypeOfMenu implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "typeOfMenu")
    private Set<Menu> typesOfMenus = new HashSet<>();

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

    public TypeOfMenu name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Menu> getTypesOfMenus() {
        return typesOfMenus;
    }

    public TypeOfMenu typesOfMenus(Set<Menu> menus) {
        this.typesOfMenus = menus;
        return this;
    }

    public TypeOfMenu addTypesOfMenu(Menu menu) {
        this.typesOfMenus.add(menu);
        menu.setTypeOfMenu(this);
        return this;
    }

    public TypeOfMenu removeTypesOfMenu(Menu menu) {
        this.typesOfMenus.remove(menu);
        menu.setTypeOfMenu(null);
        return this;
    }

    public void setTypesOfMenus(Set<Menu> menus) {
        this.typesOfMenus = menus;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TypeOfMenu)) {
            return false;
        }
        return id != null && id.equals(((TypeOfMenu) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TypeOfMenu{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
