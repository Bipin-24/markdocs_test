---
title: Managing Users
description: Learn how to create, edit, and delete users in Zeenea, including password management and access restrictions.
---

# {% $markdoc.frontmatter.title %} 


Managing the repository of users is done through the administration interface in the **Users & Contacts** section.

![Users & Contacts section](/images/zeenea-users.png)

## Creating a new user

Click the **New User** button and fill in the required fields:

- **Email**: The user's email is used as their unique identifier in Zeenea and also as their login.
- **Groups**: A user can belong to one or several groups. Select groups to give extra permissions to the user. There are two types of group licenses:

	{% table %}
	- Group Type | Description
	- Explorer | Read access to default and shared catalog items in the Federated Catalog.
	- Data Steward | Additional permissions and different pricing.
	{% /table %}

	A user can also belong to no group. In this case, they have read access in the Explorer to the default catalog items and also to the shared items in the Federated Catalog.
- **First name/Lastname**
- **Phone number**

![Create user modal](/images/zeenea-create-user.png)

{% callout type="warning" %}
Once the user is created, you cannot modify their email address. If necessary, delete and then recreate the user.
{% /callout %}

{% callout type="check" %}
When you create a new user, a new contact is automatically created in the Zeenea repository.
{% /callout %}


## Defining the user password

If you are using an identity federation for the connection with Zeenea, the password to use is the one of the identity federation.

If you are using a database specific to Zeenea for the connection, the user will receive 2 emails inviting them to validate their email address via a link and to change their password via a dedicated interface. The password must comply with a security level that is indicated to the user when it is set up.

## Editing a user

It is possible at any time to edit an existing user. Only two restrictions apply:

- There must always be at least one user in the **Super Admin** group.
- Once the user is created, their email cannot be changed.

## Deleting a user

You can delete a user directly from the list or the edition modal.

When deleting, three restrictions apply:

- You cannot delete your own user.
- You cannot delete the last **Super Admin**.
- You cannot delete a user assigned as a **Curator** of an item. Before deleting, you must first delete the links.