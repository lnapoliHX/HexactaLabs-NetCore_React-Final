

rundotnet() {
    dotnet restore &
    dotnet build &
<<<<<<< HEAD
    dotnet run --project ./Stock.Api/Stock.Api.csproj;
}

rundotnet
read -p "Pressione una tecla ..."
=======
    dotnet run --project Stock.Api/Stock.Api.csproj;
}

rundotnet
>>>>>>> 6df99f5f4d613fd1494eaa06a4f06e9e68db8cb4
