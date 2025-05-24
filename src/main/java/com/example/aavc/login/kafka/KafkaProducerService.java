package com.example.aavc.login.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

    private static final String TOPIC="user-event";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendUserEvent(String message){
        kafkaTemplate.send(TOPIC, message);
    }
}
