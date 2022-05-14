package com.application.heatmap.services;

import com.application.heatmap.entities.Valuation;
import com.application.heatmap.repositories.ValuationRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ValuationService {
    
    final ValuationRepository valuationRepository;
    
    public ValuationService(ValuationRepository valuationRepository){
        this.valuationRepository = valuationRepository;
    }

    public List<Valuation> findAll(){
        return valuationRepository.findAll();
    }
    
    public Optional<Valuation> findbyId(Long id){
        return valuationRepository.findById(id);
    }
    
    @Transactional
    public Valuation save(Valuation valuation){
        return valuationRepository.save(valuation);
    }
    
    @Transactional
    public void delete(Valuation valuation){
        valuationRepository.delete(valuation);
    }
    
}
