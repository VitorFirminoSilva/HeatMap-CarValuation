package com.application.heatmap.repositories;

import com.application.heatmap.entities.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long>{
    
    boolean existsByBrandName(String brandName);
    
}
