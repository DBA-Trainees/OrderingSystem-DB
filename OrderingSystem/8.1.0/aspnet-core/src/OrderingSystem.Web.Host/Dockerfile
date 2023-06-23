FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src
COPY ["src/OrderingSystem.Web.Host/OrderingSystem.Web.Host.csproj", "src/OrderingSystem.Web.Host/"]
COPY ["src/OrderingSystem.Web.Core/OrderingSystem.Web.Core.csproj", "src/OrderingSystem.Web.Core/"]
COPY ["src/OrderingSystem.Application/OrderingSystem.Application.csproj", "src/OrderingSystem.Application/"]
COPY ["src/OrderingSystem.Core/OrderingSystem.Core.csproj", "src/OrderingSystem.Core/"]
COPY ["src/OrderingSystem.EntityFrameworkCore/OrderingSystem.EntityFrameworkCore.csproj", "src/OrderingSystem.EntityFrameworkCore/"]
WORKDIR "/src/src/OrderingSystem.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/OrderingSystem.Web.Host", "src/OrderingSystem.Web.Host"]
COPY ["src/OrderingSystem.Web.Core", "src/OrderingSystem.Web.Core"]
COPY ["src/OrderingSystem.Application", "src/OrderingSystem.Application"]
COPY ["src/OrderingSystem.Core", "src/OrderingSystem.Core"]
COPY ["src/OrderingSystem.EntityFrameworkCore", "src/OrderingSystem.EntityFrameworkCore"]
WORKDIR "/src/src/OrderingSystem.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "OrderingSystem.Web.Host.dll"]
