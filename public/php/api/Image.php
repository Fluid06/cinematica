<?php

class Image
{
    public $ID;
    public $path;

    public static $data = [];
    public static $error = [];

    function __set($name, $value)
    {
        if (isset($this->$name)) 
        {
            $this->$name = $value;
        }
    }

    function __get($name)
    {
        if (isset($this->$name)) 
        {
            return $this->$name;
        }
    }

    function __construct($ID, $path, $image = null)
    {
        $this->ID = $ID;
        $this->path = $path;
        $this->image = $image;
    }

    public static function upload($ID, $name)
    {
        $name = iconv('UTF-8', 'ASCII//TRANSLIT', $name);
        $name =  preg_replace('/[^A-Za-z0-9\-]/', '', $name);

        $posterTarget = "./../../static/media/movies/poster/";
        $bannerTarget = "./../../static/media/movies/banner/";
        $allowedTypes = ["jpg", "jpeg", "png"];
    
        $server_name = "innodb.endora.cz:3306";
        $username = "houskasesalamem";
        $password = "Houskasesalamemjedobra123";
        $dbname = "kinocinematica";
    
        $conn = new mysqli($server_name, $username, $password, $dbname);
        if($conn->connect_error)
        {
            self::$error[] = "upload: No connection: $conn->connect_error";
            exit();
        }
    
        foreach ($_FILES as $key => $files) 
        {
            foreach ($files['name'] as $index => $file) 
            {
                $fileTmp = $files['tmp_name'][$index];
                $fileType = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    
                if (!in_array($fileType, $allowedTypes)) 
                {
                    self::$error[] = "upload: this type of file is not allowed.";
                    exit();
                }
    
                $targetDir = ($key === "poster") ? $posterTarget : $bannerTarget;
    
                if (!file_exists($targetDir)) 
                {
                    mkdir($targetDir, 0777, true);
                }
    
                $uniqueFileName = $name . '.' . $fileType;
                $counter = 1;
                while (file_exists($targetDir . $uniqueFileName)) 
                {
                    $uniqueFileName = $name . '_' . $counter . '.' . $fileType;
                    $counter++;
                }
    
                $destination = $targetDir . $uniqueFileName;
                if (!move_uploaded_file($fileTmp, $destination)) 
                {
                    self::$error[] = "Error moving file.";
                    exit();
                }

                $sql = "INSERT INTO `image` (`path`, `ID-movie`) 
                VALUES (?, ?);";
        
                $stmt = $conn->prepare($sql);
                if (!$stmt) 
                {
                    self::$error[] = "upload: Prepare failed: $conn->error";
                    exit();
                }
        
                $stmt->bind_param("si", $destination, $ID);
                if (!$stmt->execute()) 
                {
                    self::$error[] = "upload: No upload: $stmt->error";
                    exit();
                }
        
            }
        }
        $conn->close();
    }

    public static function download($sql = "SELECT * FROM `image`")
    {

        $server_name = "innodb.endora.cz:3306";
        $username = "houskasesalamem";
        $password = "Houskasesalamemjedobra123";
        $dbname = "kinocinematica";

        $conn = new mysqli($server_name, $username, $password, $dbname);
        if($conn->connect_error)
        {
            self::$error[] = "download: No connection: $conn->connect_error";
            exit();
        }

        $stmt = $conn->prepare($sql);
        if (!$stmt) 
        {
            self::$error[] = "download: Prepare failed: $conn->error";
            exit();
        }

        if (!$stmt->execute()) 
        {
            self::$error[] = "download: No execute: $stmt->error";
            exit();
        }


        $result = $stmt->get_result();
        while($row = $result->fetch_assoc()) 
        {
            $image = new Image($row["ID"], $row["path"]);
            self::$data[] = $image;
        }

        $stmt->close();
        $conn->close();

    }
}

?>