This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
You can find the most recent version of the Create React App guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

### Shape of Redux State:

```javascript
{
	user: {
		characterName: string,
    	characterID: integer,
		accessType: string,
		lastVisitedLocations: [integer]
	},
	error: {
		message: string
	}
}
```