<?php
require_once ('db/DB.php');
require_once ('user/User.php');

class Application { 
    function __construct(){
        $this->db = new DB();
        $this->user = new User($this->db);
    }

    public function login($params){
        if($params['login'] && $params ['password']) {
            return $this->user->login($params['login'], $params['password']);
        }
    }

    public function registration($params) {
        if($params['name'] && $params['login'] && $params ['password']) {
            return $this->user->registration($params['name'], $params['login'], $params ['password']);
        }
    }

    public function logout($params){
        if($params['token']) {
            return $this->user->logout($params['token']);
        }	
	}
	
	public function sendScore($params) {
		if($params['token'] && $params['score']) {
			$user = $this->user->getUser($params['token']);
			if ($user) {
				$this->db->sendScore($params['token'], $params['score']);
				return true;
			}
		}
		return false;
	}
	
	public function getRecords(){
		return $this->db->getRecords();
	}
    
}