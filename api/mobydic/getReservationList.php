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

echo $_GET['NAME'];

mysql_close($conn);
?>