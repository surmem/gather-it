echo off

echo ########## BUILD START TIME: %date% - %time% ##########

REM ######################
REM Set script variables #
REM ######################
set GI_ROOT=..
set GI_SRC=%GI_ROOT%\src
set GI_LIB=%GI_ROOT%\lib
set GI_BUILD_OUTPUT=%GI_ROOT%\build-output

REM ###################################
REM Clean up previous build artifacts #
REM ###################################
rmdir /S /Q %GI_LIB%
rmdir /S /Q %GI_SRC%\css
del /S %GI_SRC%\js\gather-it.js

REM ###############
REM Build library #
REM ###############
call %GI_SRC%\js\dojo\util\buildscripts\build.bat --profile .\gather-it.profile.js

REM #############################
REM Clean up uncompressed files #
REM #############################
del /S %GI_LIB%\*.js.uncompressed.js

REM ###################
REM Copy minified CSS #
REM ###################
copy /Y %GI_BUILD_OUTPUT%\gather-it\cards\mtg\css\GatherIt.css %GI_LIB%\gather-it.css

REM ################################
REM Copy library to test locations #
REM ################################
mkdir %GI_SRC%\css
echo %cd%
copy /Y %GI_LIB%\gather-it.css %GI_SRC%\css\gather-it.css
copy /Y %GI_LIB%\gather-it.js %GI_SRC%\js\gather-it.js

REM #######################
REM Clean up build output #
REM #######################
rmdir /S /Q %GI_BUILD_OUTPUT%

echo ########## BUILD END TIME: %date% - %time% ##########