package com.application.heatmap.repositories;

import com.application.heatmap.entities.Valuation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ValuationRepository extends JpaRepository<Valuation, Long>{
}
