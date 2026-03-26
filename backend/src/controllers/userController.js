const qrService = require('../services/qrService');
const logger = require('../utils/logger');
const crypto = require('crypto');
const qrCodeModel = require('../models/qrCodeModel');

async function verifyUser(req, res) {
    const { token, username, dateOfBirth } = req.body || {};
  
    if (!token || !username || !dateOfBirth) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }
  
    try {
    
      const user =await qrCodeModel.findByToken(token);;

      if (!user) {
        return res.json({
          success: false,
          message: "Invalid token",
        });
      }
  
      if (user.status === "1") {
        return res.json({
          success: false,
          message: "used",
        });
      }
            console.log(user.date_of_birth)
          const dbDate = new Date(user.date_of_birth)
            .toISOString()
            .slice(0, 10);
            
            console.log(user.username);
            console.log(dbDate);

            console.log(username);
            console.log(dateOfBirth);

            if (
                user.username === username &&
                dbDate === dateOfBirth
            ) 
            {
              console.log(dbDate);
            
                await qrCodeModel.markAsUsed(token);
                    console.log('susses');
                return res.json({
                success: true,
                });
            }
        
        
            return res.json({
                success: false,
                message: "The information does not match.",
            });
   
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }

  module.exports = {
    verifyUser
  };