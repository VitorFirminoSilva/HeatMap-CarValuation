package com.application.heatmap.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import javax.persistence.*;

@Entity
@Table(name = "carValuation")
public class Valuation implements Serializable{
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "dateValuation", nullable = false)
    private Date dateValuation;
    
    @Column(name = "value", nullable = false)
    private Double value;
    
    public Valuation(){}

    public Valuation(Long id, Date dateValuation, Double value) {
        this.id = id;
        this.dateValuation = dateValuation;
        this.value = value;
    }

    public Date getDateValuation() {
        return dateValuation;
    }

    public void setDateValuation(Date dateValuation) {
        this.dateValuation = dateValuation;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 37 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Valuation other = (Valuation) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }  
}
