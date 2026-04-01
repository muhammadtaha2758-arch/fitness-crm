<?php

namespace App\Traits;

use Illuminate\Support\Facades\Crypt;

trait Encryptable
{
    /**
     * Encrypt sensitive data
     */
    public function encrypt($value)
    {
        if (empty($value)) {
            return null;
        }
        
        return Crypt::encryptString($value);
    }

    /**
     * Decrypt sensitive data
     */
    public function decrypt($value)
    {
        if (empty($value)) {
            return null;
        }
        
        try {
            return Crypt::decryptString($value);
        } catch (\Exception $e) {
            // If decryption fails, return the original value (might be unencrypted legacy data)
            return $value;
        }
    }

    /**
     * Mask sensitive data for display
     */
    public function mask($value, $type = 'default')
    {
        if (empty($value)) {
            return null;
        }

        // Safety check: if the value looks like encrypted data (starts with eyJ), don't mask it
        if (strpos($value, 'eyJ') === 0) {
            return '[ENCRYPTED DATA]';
        }

        switch ($type) {
            case 'account_number':
                // Show last 4 digits: ****1234
                if (strlen($value) >= 4) {
                    return str_repeat('*', strlen($value) - 4) . substr($value, -4);
                }
                return str_repeat('*', strlen($value));
                
            case 'routing_number':
                // Show first 2 and last 2 digits: 12****34
                if (strlen($value) >= 4) {
                    return substr($value, 0, 2) . str_repeat('*', strlen($value) - 4) . substr($value, -2);
                }
                return str_repeat('*', strlen($value));
                
            case 'name':
                // Show first letter and last letter: J***n
                if (strlen($value) >= 2) {
                    return $value[0] . str_repeat('*', strlen($value) - 2) . $value[strlen($value) - 1];
                }
                return $value[0] . '*';
                
            default:
                // Default masking: show first and last character
                if (strlen($value) >= 2) {
                    return $value[0] . str_repeat('*', strlen($value) - 2) . $value[strlen($value) - 1];
                }
                return str_repeat('*', strlen($value));
        }
    }

    /**
     * Get encrypted attribute
     */
    public function getEncryptedAttribute($key)
    {
        $value = $this->getAttribute($key);
        return $this->decrypt($value);
    }

    /**
     * Set encrypted attribute
     */
    public function setEncryptedAttribute($key, $value)
    {
        $this->setAttribute($key, $this->encrypt($value));
    }

    /**
     * Get masked attribute for display
     */
    public function getMaskedAttribute($key, $type = 'default')
    {
        $value = $this->getEncryptedAttribute($key);
        return $this->mask($value, $type);
    }
}
