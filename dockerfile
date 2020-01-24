FROM microsoft/dotnet:2.2.104-sdk AS build-env
WORKDIR /app

# copy csproj and restore as distinct layers
COPY wait-time.csproj ./
RUN dotnet restore

# build client app
FROM node as client-build
WORKDIR /app

COPY ./ClientApp/package.json .
RUN npm install --silent

COPY ./ClientApp ./
RUN npm run build

# merge the contents of .NET build env and client-build and publish.
FROM build-env as publish
WORKDIR /app
COPY . ./

# project file has provisions to include /ClientApp/build in published output.
COPY --from=client-build /app/build ./ClientApp/build

RUN dotnet publish -c Release -o out

# build runtime image
FROM microsoft/dotnet:2.2.2-aspnetcore-runtime
WORKDIR /app

COPY --from=publish /app/out .
ENTRYPOINT ["dotnet", "WaitTime.dll"]
