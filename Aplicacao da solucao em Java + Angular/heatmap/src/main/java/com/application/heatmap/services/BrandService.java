package com.application.heatmap.services;

import com.application.heatmap.entities.Brand;
import com.application.heatmap.repositories.BrandRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;

public class BrandService {
    final BrandRepository brandRepository;
    
    public BrandService(BrandRepository brandRepository){
        this.brandRepository = brandRepository;
    }
    
    
    public List<Brand> findAll(){
        return brandRepository.findAll();
    }
    
    public Optional<Brand> findById(Long id){
        return brandRepository.findById(id);
    }
    
    public boolean existsByBrandName(String brandName){
        return brandRepository.existsByBrandName(brandName);
    }
    
    @Transactional
    public Brand save(Brand brand){
        return brandRepository.save(brand);
    }
    
    @Transactional
    public void delete(Brand brand){
        brandRepository.delete(brand);
    }
    
    
    
    
    
    
}
