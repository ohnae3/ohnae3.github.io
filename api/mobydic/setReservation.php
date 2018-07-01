<?
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS, HEAD");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization");

$conn = mysql_connect("localhost:3306", "ohnae3", "rhfqoddl2");
mysql_select_db("ohnae3",$conn);
extract($_POST);
extract($_GET);




$query = '
	SELECT 
		   * 
	FROM   RESERVATION
	WHERE  1=1
	AND    NO = '.$_GET['NO'].'
';

$query2 = '
	INSERT INTO RESERVATION (
		   NAME 
		  ,DATE 
		  ,TIME
		  ,PERSONNEL
		  ,PHONE
		  ,EMAIL
		  ,NOTICE
		  ,PASSWORD
	)
	VALUES
	(
		   '.$_GET['NAME'].'
		  ,'.$_GET['DATE'].'
		  ,'.$_GET['TIME'].'
		  ,'.$_GET['PERSONNEL'].'
		  ,'.$_GET['PHONE'].'
		  ,'.$_GET['EMAIL'].'
		  ,'.$_GET['NOTICE'].'
		  ,'.$_GET['PASSWORD'].'
	)
';

/*
NAME: '최재호',
NO : '4',
DATE: '',
TIME: '7',
PERSONNEL: '2',
PHONE: '',
EMAIL: '',
NOTICE: '비고',
PASSWORD: '',
PASSWORD2: '',
CAPTCHA: ''

*/

$result = mysql_query($query) or die(mysql_error());
$resultMap = array();
while($object = mysql_fetch_object($result)){
 $resultMap[] = $object;
}
echo $_GET['callback'].'(' . json_encode($resultMap) . ')';

mysql_close($conn);
?>