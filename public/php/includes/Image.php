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
    
        $targetDir = "./../../img/";
        $allowedTypes = ["jpg", "jpeg", "png"];
    
        $server_name = "innodb.endora.cz:3306";
        $username = "houskasesalamem";
        $password = "Houskasesalamemjedobra123";
        $dbname = "kinocinematica";
    
        $conn = new mysqli($server_name, $username, $password, $dbname);
        if ($conn->connect_error) 
        {
            self::$error[] = "upload: No connection: $conn->connect_error";
            return;
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
                    return;
                }
    
                $prefix = ($key === "poster") ? "poster" : "banner";
    
                if (!file_exists($targetDir)) 
                {
                    mkdir($targetDir, 0777, true);
                }
    
                $uniqueFileName = $name . "-" . $prefix . '.' . $fileType;
                $counter = 1;
                while (file_exists($targetDir . $uniqueFileName)) 
                {
                    $uniqueFileName = $name . "-" . $prefix . "_" . $counter . '.' . $fileType;
                    $counter++;
                }
    
                $destination = $targetDir . $uniqueFileName;
                if (!move_uploaded_file($fileTmp, $destination)) 
                {
                    self::$error[] = "Error moving file.";
                    return;
                }
    
                $sql = "INSERT INTO `image` (`path`, `ID-movie`) 
                        VALUES (?, ?);";
    
                $stmt = $conn->prepare($sql);
                if (!$stmt) 
                {
                    self::$error[] = "upload: Prepare failed: $conn->error";
                    return;
                }
    
                $pathBind = "https://cinematica.8u.cz/img/".$uniqueFileName;
                $stmt->bind_param("si", $pathBind, $ID);
                if (!$stmt->execute()) 
                {
                    self::$error[] = "upload: No upload: $stmt->error";
                    return;
                }
            }
        }
        $conn->close();
    }

    public function delete()
    {

        $file = basename($this->path);
        $destination = "./../../img/".$file;
        unlink($destination);

        $server_name = "innodb.endora.cz:3306";
        $username = "houskasesalamem";
        $password = "Houskasesalamemjedobra123";
        $dbname = "kinocinematica";

        $conn = new mysqli($server_name, $username, $password, $dbname);
        if($conn->connect_error)
        {
            self::$error[] = "delete: No connection: $conn->connect_error";
            return;
        }

        $sql = "DELETE FROM `image` WHERE `ID` = ".$this->ID.";";
        $stmt = $conn->prepare($sql);
        if (!$stmt) 
        {
            self::$error[] = "delete: Prepare failed: $conn->error";
            return;
        }

        if (!$stmt->execute()) 
        {
            self::$error[] = "delete: No execute: $stmt->error";
            return;
        }

        $stmt->close();
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
            return;
        }

        $stmt = $conn->prepare($sql);
        if (!$stmt) 
        {
            self::$error[] = "download: Prepare failed: $conn->error";
            return;
        }

        if (!$stmt->execute()) 
        {
            self::$error[] = "download: No execute: $stmt->error";
            return;
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