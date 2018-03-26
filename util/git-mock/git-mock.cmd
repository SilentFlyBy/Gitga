 @ECHO OFF

 IF "%1" == "status" (
    ECHO A  test.js
 ) ELSE (
     ECHO %*
 )
 ECHO ON