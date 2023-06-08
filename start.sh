# Build FE
cd ./waffle
npm install
npm run build

# Move FE build to BE
cd ..
rm -rf ./server/dist
mv ./waffle/dist ./server/dist

# Start BE
cd server
npm install
nohup npm start > ../log.out 2>&1 &

echo "Started app"