

By conventions:
- All fields of types and objects must start with an uppercase.
- All reducer types must start with a dollar sign ($) and an uppercase letter.
- React Component names must start with an uppercase letter.
- Action names has the same naming conventions as constants. These names must
start with underscore(_) for internal facing actions. For private action creators,
prepend the action creator name with the corresponding reducer's name

There are two ways to propagate actions:
- Share actions and have many action creators for a same kind of action
- Don't share and create a different actions the first option sound better!!
