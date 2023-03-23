# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user=User.create(username:"prince", password: "gobah", image_url: "ihttps://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg", bio: "hey i was seeded")
post=user.posts.create(blog: "Whenever the store changes, all of the mapStateToProps functions of all of the connected components will run. Because of this, your mapStateToProps functions should run as fast as possible. This also means that a slow mapStateToProps function can be a potential bottleneck for your application.

As part of the idea, mapStateToProps functions frequently need to transform data in various ways (such as filtering an array, mapping an array of IDs to their corresponding objects, or extracting plain JS values from Immutable.js objects). These transformations can often be expensive, both in terms of cost to execute the transformation, and whether the component re-renders as a result. If performance is a concern, ensure that these transformations are only run if the input values have changed.

mapStateToProps Functions Should Be Pure and Synchronous​
Much like a Redux reducer, a mapStateToProps function should always be 100% pure and synchronous. It should only take state (and ownProps) as arguments, and return the data the component needs as props without mutating those arguments. It should not be used to trigger asynchronous behavior like AJAX calls for data fetching, and the functions should not be declared as async.", title: "Seeded blog", likes:6, views:50)

post.tags.create(name: "Ruby" )


user2=User.create(username:"seeded", password: "Super", image_url: "https://media.istockphoto.com/photos/slave-hands-broken-chains-with-bird-flying-picture-id1296601764?b=1&k=20&m=1296601764&s=170667a&w=0&h=0hjKKZZYp2Wl1BRxopegdWrJwTwi1Vlbs_aXdmhhr_o=", bio: "hey i was seeded")
post2=user2.posts.create(blog: "Whoever the store changes, all of the mapStateToProps functions of all of the connected components will run. Because of this, your mapStateToProps functions should run as fast as possible. This also means that a slow mapStateToProps function can be a potential bottleneck for your application.

As part of the idea, mapStateToProps functions frequently need to transform data in various ways (such as filtering an array, mapping an array of IDs to their corresponding objects, or extracting plain JS values from Immutable.js objects). These transformations can often be expensive, both in terms of cost to execute the transformation, and whether the component re-renders as a result. If performance is a concern, ensure that these transformations are only run if the input values have changed.

mapStateToProps Functions Should Be Pure and Synchronous​
Much like a Redux reducer, a mapStateToProps function should always be 100% pure and synchronous. It should only take state (and ownProps) as arguments, and return the data the component needs as props without mutating those arguments. It should not be used to trigger asynchronous behavior like AJAX calls for data fetching, and the functions should not be declared as async.", title: "Seeded blog", likes:6, views:50)

post2.tags.create(name: "Ruby" )

user3=User.create(username:"IwasSeeded", password: "Superseeded", image_url: "https://media.istockphoto.com/photos/slave-hands-broken-chains-with-bird-flying-picture-id1296601764?b=1&k=20&m=1296601764&s=170667a&w=0&h=0hjKKZZYp2Wl1BRxopegdWrJwTwi1Vlbs_aXdmhhr_o=", bio: "hey i was seeded")
post3=user3.posts.create(blog: "Wherever the store changes, all of the mapStateToProps functions of all of the connected components will run. Because of this, your mapStateToProps functions should run as fast as possible. This also means that a slow mapStateToProps function can be a potential bottleneck for your application.

As part of the idea, mapStateToProps functions frequently need to transform data in various ways (such as filtering an array, mapping an array of IDs to their corresponding objects, or extracting plain JS values from Immutable.js objects). These transformations can often be expensive, both in terms of cost to execute the transformation, and whether the component re-renders as a result. If performance is a concern, ensure that these transformations are only run if the input values have changed.

mapStateToProps Functions Should Be Pure and Synchronous​
Much like a Redux reducer, a mapStateToProps function should always be 100% pure and synchronous. It should only take state (and ownProps) as arguments, and return the data the component needs as props without mutating those arguments. It should not be used to trigger asynchronous behavior like AJAX calls for data fetching, and the functions should not be declared as async.", title: "Seeded blog", likes:6, views:50)

post3.tags.create(name: "nba" )