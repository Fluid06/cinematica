<?php

class CustomSession 
{
    public static function start() 
    {
        if (session_status() == PHP_SESSION_NONE) 
        {
            session_start();
        }
    }
    
    public static function set($key, $value) 
    {
        self::start();
        $_SESSION[$key] = $value;
    }
    
    public static function get($key, $default = null) 
    {
        self::start();
        return isset($_SESSION[$key]) ? $_SESSION[$key] : $default;
    }
    
    public static function has($key) 
    {
        self::start();
        return isset($_SESSION[$key]);
    }
    
    public static function remove($key) 
    {
        self::start();
        if (isset($_SESSION[$key])) 
        {
            unset($_SESSION[$key]);
        }
    }
    
    public static function destroy() 
    {
        self::start();
        session_destroy();
    }
}

?>
