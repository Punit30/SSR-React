import { gql } from "@apollo/client"

export const addEditResourceGroupMutation = gql`
	mutation addOrUpdateResourceGroup($id: String, $title: String, $description: String) {
		addOrUpdateResourceGroup(resourceGroupInput: { id: $id, title: $title, description: $description }) {
			statusCode
			message
		}
	}
`

export const reArrageResourceGroupsMutation = gql`
	mutation reOrderResourceGroups($orderList: [OrderInput!]) {
		reOrderResourceGroups(orderInput: { orderList: $orderList }) {
			statusCode
			message
		}
	}
`

export const dltResourceGroupMutation = gql`
	mutation deleteResourceGroup($resourceGroupId: Long!) {
		deleteResourceGroup(resourceGroupId: $resourceGroupId) {
			statusCode
			message
		}
	}
`

// for resources
export const reArrangeResourcesMutation = gql`
	mutation reOrderResources($resourceGroupId: Long!, $orderList: [OrderInput!]) {
		reOrderResources(orderInput: { resourceGroupId: $resourceGroupId, orderList: $orderList }) {
			statusCode
			message
		}
	}
`

export const dltResourceMutation = gql`
	mutation deleteResource($resourceId: Long!) {
		deleteResource(resourceId: $resourceId) {
			statusCode
			message
		}
	}
`
