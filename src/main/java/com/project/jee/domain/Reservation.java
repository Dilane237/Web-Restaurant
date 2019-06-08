package com.project.jee.domain;



import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Reservation.
 */
@Entity
@Table(name = "reservation")
public class Reservation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "jhi_tables")
    private Long tables;

    @Column(name = "reserved_at")
    private Instant reservedAt;

    @Column(name = "reservation_time")
    private Instant reservationTime;

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

    public Reservation name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getTables() {
        return tables;
    }

    public Reservation tables(Long tables) {
        this.tables = tables;
        return this;
    }

    public void setTables(Long tables) {
        this.tables = tables;
    }

    public Instant getReservedAt() {
        return reservedAt;
    }

    public Reservation reservedAt(Instant reservedAt) {
        this.reservedAt = reservedAt;
        return this;
    }

    public void setReservedAt(Instant reservedAt) {
        this.reservedAt = reservedAt;
    }

    public Instant getReservationTime() {
        return reservationTime;
    }

    public Reservation reservationTime(Instant reservationTime) {
        this.reservationTime = reservationTime;
        return this;
    }

    public void setReservationTime(Instant reservationTime) {
        this.reservationTime = reservationTime;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Reservation)) {
            return false;
        }
        return id != null && id.equals(((Reservation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Reservation{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", tables=" + getTables() +
            ", reservedAt='" + getReservedAt() + "'" +
            ", reservationTime='" + getReservationTime() + "'" +
            "}";
    }
}
