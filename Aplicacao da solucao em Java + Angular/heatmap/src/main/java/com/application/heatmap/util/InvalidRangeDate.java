package com.application.heatmap.util;

public class InvalidRangeDate extends Exception{
    public InvalidRangeDate(){}
    
    public InvalidRangeDate(String msg){
        super(msg);
    }
}