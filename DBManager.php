<?php

class DBManager{
    const DSN = 'mysql:host=localhost;dbname=ailes_leonard';
    const USER = 'root';
    const PASS = 'root';
    private $_db;
    private $_options = [
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET Names utf8', // Ensure utf8 encoding
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_EMULATE_PREPARES => false
    ];

    public function __construct(){
        try{
          $this->_db = new PDO(self::DSN, self::USER, self::PASS, $this->_options);
        }catch (PDOException $e){
          die('Erreur : ' . $e->getMessage());
        }
    }

    public function getDB(){
        return $this->_db;
    }

    public function addPersonne(string $nom, string $prenom, string $email){
        $addP = $this->_db->prepare('INSERT INTO personne(Nom, Prenom, Email) VALUES(:nom, :prenom, :email)');
        $addP->execute(array('nom'=>$nom, 'prenom'=>$prenom, "email"=>$email));
    }

    public function deletePersonne(int $id){
        $delP = $this->_db->prepare('DELETE FROM personne WHERE Id=?');
        $delP->execute([$id]);
    }

    public function updatePersonne(int $id, string $nom, string $prenom, string $email){
        $updateP = $this->_db->prepare('UPDATE personne SET Nom = :nom, Prenom = :prenom, Email = :email WHERE Id = :id');
        $updateP->execute(array('nom'=>$nom, 'prenom'=>$prenom, "email"=>$email, 'id'=>$id));
    }

    public function getPersonne(int $id){
        $getP = $this->_db->prepare('SELECT * FROM personne WHERE Id = ?');
        $getP->execute([$id]);
        return $getP->fetch();
    }

    public function addStrophe(string $str){
        $addStr = $this->_db->prepare('INSERT INTO poesie(Strophe, Date_crea) VALUES(:strophe, now())');
        $addStr->execute(array('strophe'=>$str));
    }

    public function deleteStrophe(int $id){
        $delStr = $this->_db->prepare('DELETE FROM poesie WHERE Id=?');
        $delStr->execute([$id]);
    }

    public function getStrophe(int $id){
        $getStr = $this->_db->prepare('SELECT * FROM poesie WHERE Id = ?');
        $getStr->execute([$id]);
        return $getStr->fetch();
    }

    public function getAllStrophes(){
        $getAll = $this->_db->prepare('SELECT * FROM poesie');
        $getAll->execute();
        return $getAll->fetchAll();
    }

    public function getAllStrophesButOne(int $id){
        $getAll = $this->_db->prepare('SELECT * FROM poesie WHERE Id != ?');
        $getAll->execute(array($id));
        return $getAll->fetchAll();
    }

    // Returns int total number of strophes in database
    public function totalStrophes(){
        $nb = $this->_db->prepare('SELECT COUNT(*) FROM poesie');
        $nb->execute();
        return $nb->fetch()[0];
    }

    public function addMsg(string $msg, int $idPersonne){
        $addMsg = $this->_db->prepare('INSERT INTO message(Contenu, Date_msg, Id_personne) VALUES(:msg, now(), :id_p)');
        $addMsg->execute(array('msg'=>$msg, 'id_p'=> $idPersonne));
    }

    public function deleteMsg(int $id){
        $delMsg = $this->_db->prepare('DELETE FROM message WHERE Id=?');
        $delMsg->execute([$id]);
    }
}
    ?>
