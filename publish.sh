#!/bin/bash

# destination="dist2"
destination="../../google-vm-server/jap-v5"
rm -r $destination
cp -r dist $destination
sed -i 's/="\//=".\//g' "$destination/index.html"
# more "$destination/index.html"
echo 'success!'
