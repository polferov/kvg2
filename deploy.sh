az extension add --upgrade --name containerapp
export CURRENT=$(az containerapp revision list --name kvg2 --resource-group kvg2 | grep '"name"' | grep '"kvg2--' | tail -n 1 | sed 's/ *"name": *"//g' | sed -r 's/",?$//')
az containerapp revision copy --resource-group kvg2 --name kvg2 --image "polferov/kvg2:$BUILD_BUILDID" --from-revision "$CURRENT"