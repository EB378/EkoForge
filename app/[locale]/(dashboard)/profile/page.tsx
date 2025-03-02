"use client";

import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  useGetIdentity,
  useOne,
  useUpdate,
  HttpError,
} from "@refinedev/core";
import { useTranslations } from "next-intl";
import { EditButton, MarkdownField } from "@refinedev/mui";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface Section {
  id: string;
  name: string;
}

interface Task {
  id: number;
  task: string;
  completed: boolean;
  // Stores the ID of the section (from the profile.sections or default sections)
  section: string;
}

interface Note {
  id: number;
  note: string;
  section: string;
}

interface ProfileData {
  id: string;
  avatar?: string;
  fullname: string;
  username: string;
  email: string;
  phone: string;
  streetaddress: string;
  city: string;
  country: string;
  zip: string;
  role: string;
  tasks?: Task[];
  notes?: Note[];
  // Custom (personalized) sections stored on the profile.
  // Note: Default sections ("all", "active", "archived") are managed in the UI.
  sections?: Section[];
}

export default function ProfilePage() {
  const t = useTranslations("Profile");

  // Get the current user's identity.
  const { data: identity } = useGetIdentity<{ id: string }>();
  const userId = identity?.id ?? "";

  // Fetch the profile data.
  const { data, isLoading, isError } = useOne<ProfileData, HttpError>({
    id: userId,
    meta: { select: "*" },
  });

  // Hook for updating the profile.
  const { mutate: updateProfile } = useUpdate<ProfileData>();

  // Local state for tasks, notes, and sections.
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [newTask, setNewTask] = React.useState("");
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [newNote, setNewNote] = React.useState("");

  // Default filters: "all" shows every task/note; if adding a new item while in "all", it will default to "active".
  const [taskFilter, setTaskFilter] = React.useState<string>("all");
  const [noteFilter, setNoteFilter] = React.useState<string>("all");

  // State for adding a new custom section.
  const [newSectionName, setNewSectionName] = React.useState("");

  // Always call hooks. Later, we conditionally render based on the state.
  const profile = data?.data;
  // The personalized sections stored on the profile.
  const customSections: Section[] = profile?.sections || [];

  // Define default sections that always exist.
  const defaultSections: Section[] = [
    { id: "all", name: "All" },
    { id: "active", name: "Active" },
    { id: "archived", name: "Archived" },
  ];

  // Merge default sections with custom sections (avoid duplicates).
  const availableSections: Section[] = React.useMemo(() => {
    const custom = customSections.filter(
      (sec) => sec.id !== "active" && sec.id !== "all" && sec.id !== "archived"
    );
    return [...defaultSections, ...custom];
  }, [customSections]);

  // Initialize tasks and notes when the profile loads.
  React.useEffect(() => {
    if (profile) {
      setTasks(
        profile.tasks?.map((task) => ({
          ...task,
          // Fallback to "active" if no section is defined.
          section: task.section || "active",
        })) || []
      );
      setNotes(
        profile.notes?.map((note) => ({
          ...note,
          section: note.section || "active",
        })) || []
      );
    }
  }, [profile]);

  // === TASK FUNCTIONS ===
  const addTask = () => {
    if (newTask.trim() === "") return;
    const nextId = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    // If the current filter is "all", default new tasks to the "active" section.
    const effectiveSection = taskFilter === "all" ? "active" : taskFilter;
    const newTaskItem: Task = {
      id: nextId,
      task: newTask.trim(),
      completed: false,
      section: effectiveSection,
    };
    const updatedTasks = [...tasks, newTaskItem];
    setTasks(updatedTasks);
    setNewTask("");
    updateProfile({
      resource: "profiles",
      id: profile?.id || "",
      values: { tasks: updatedTasks },
    });
  };

  const toggleTask = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    updateProfile({
      resource: "profiles",
      id: profile?.id || "",
      values: { tasks: updatedTasks },
    });
  };

  const modifyTask = (id: number) => {
    const taskToModify = tasks.find((task) => task.id === id);
    if (!taskToModify) return;
    const newText = prompt("Edit task:", taskToModify.task);
    if (newText === null) return;
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, task: newText } : task
    );
    setTasks(updatedTasks);
    updateProfile({
      resource: "profiles",
      id: profile?.id || "",
      values: { tasks: updatedTasks },
    });
  };

  const changeTaskSection = (id: number, newSectionId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, section: newSectionId } : task
    );
    setTasks(updatedTasks);
    updateProfile({
      resource: "profiles",
      id: profile?.id || "",
      values: { tasks: updatedTasks },
    });
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    updateProfile({
      resource: "profiles",
      id: profile?.id || "",
      values: { tasks: updatedTasks },
    });
  };

  // === NOTE FUNCTIONS ===
  const addNote = () => {
    if (newNote.trim() === "") return;
    const nextId = notes.length ? Math.max(...notes.map((n) => n.id)) + 1 : 1;
    const effectiveSection = noteFilter === "all" ? "active" : noteFilter;
    const newNoteItem: Note = {
      id: nextId,
      note: newNote.trim(),
      section: effectiveSection,
    };
    const updatedNotes = [...notes, newNoteItem];
    setNotes(updatedNotes);
    setNewNote("");
    updateProfile({
      resource: "profiles",
      id: profile?.id || "",
      values: { notes: updatedNotes },
    });
  };

  const modifyNote = (id: number) => {
    const noteToModify = notes.find((n) => n.id === id);
    if (!noteToModify) return;
    const newText = prompt("Edit note:", noteToModify.note);
    if (newText === null) return;
    const updatedNotes = notes.map((n) =>
      n.id === id ? { ...n, note: newText } : n
    );
    setNotes(updatedNotes);
    updateProfile({
      resource: "profiles",
      id: profile?.id || "",
      values: { notes: updatedNotes },
    });
  };

  const changeNoteSection = (id: number, newSectionId: string) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, section: newSectionId } : note
    );
    setNotes(updatedNotes);
    updateProfile({
      resource: "profiles",
      id: profile?.id || "",
      values: { notes: updatedNotes },
    });
  };

  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter((n) => n.id !== id);
    setNotes(updatedNotes);
    updateProfile({
      resource: "profiles",
      id: profile?.id || "",
      values: { notes: updatedNotes },
    });
  };

  // Helper function to generate a unique id for custom sections.
  const generateUniqueId = () => Math.random().toString(36).substr(2, 9);

  // === SECTION MANAGEMENT FUNCTIONS ===
  const addNewSection = () => {
    if (newSectionName.trim() === "") return;
    const newSection: Section = {
      id: generateUniqueId(),
      name: newSectionName.trim(),
    };
    // Append the new custom section.
    const updatedCustomSections = [...customSections, newSection];
    updateProfile({
      resource: "profiles",
      id: profile?.id || "",
      values: { sections: updatedCustomSections },
    });
    setNewSectionName("");
  };

  const handleDeleteSection = (id: string, name: string) => {
    // Prevent deletion of default sections.
    if (id === "all" || id === "active" || id === "archived") return;

    const updatedCustomSections = customSections.filter(
      (section) => section.id !== id
    );
    // Optionally, reassign tasks and notes from the deleted section to default values.
    const updatedTasks = tasks.map((task) =>
      task.section === id ? { ...task, section: "archived" } : task
    );
    setTasks(updatedTasks);
    updateProfile({
      resource: "profiles",
      id: profile?.id || "",
      values: { tasks: updatedTasks },
    });

    const updatedNotes = notes.map((note) =>
      note.section === id ? { ...note, section: "active" } : note
    );
    setNotes(updatedNotes);
    updateProfile({
      resource: "profiles",
      id: profile?.id || "",
      values: { notes: updatedNotes },
    });

    updateProfile({
      resource: "profiles",
      id: profile?.id || "",
      values: { sections: updatedCustomSections },
    });
  };

  // Filter tasks and notes based on the selected filter.
  // If "all" is selected, show every item.
  const filteredTasks =
    taskFilter === "all" ? tasks : tasks.filter((t) => t.section === taskFilter);
  const filteredNotes =
    noteFilter === "all" ? notes : notes.filter((n) => n.section === noteFilter);

  return (
    <Box sx={{ p: 4 }}>
      {(!userId || isLoading) && <Typography>Loading profile...</Typography>}
      {isError && <Typography>Error loading profile</Typography>}
      {userId && profile && !isLoading && !isError && (
        <Grid container spacing={4}>
          {/* Left Column: Profile Card and Personal Notes */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={4}>
              {/* Profile Card */}
              <Grid item xs={12}>
                <Card sx={{ margin: "auto", boxShadow: 3, borderRadius: 2 }}>
                  <CardMedia
                    component="div"
                    sx={{
                      height: 200,
                      backgroundColor: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 100,
                        minHeight: 100,
                        borderRadius: "50%",
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      {profile.avatar ? (
                        <img
                          src={profile.avatar}
                          alt="Profile"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <Typography variant="h4" color="primary">
                          {profile.fullname
                            ? profile.fullname.charAt(0).toUpperCase()
                            : "?"}
                        </Typography>
                      )}
                    </Box>
                  </CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      {profile.fullname || "No Name"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t("email")}: {profile.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t("username")}: {profile.username}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t("phone")}: {profile.phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t("address")}: {profile.streetaddress}, {profile.city},{" "}
                      {profile.country} {profile.zip}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t("role")}: {profile.role}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <EditButton hideText recordItemId={profile.id} />
                  </CardActions>
                </Card>
              </Grid>

              {/* Personal Notes Card */}
              <Grid item xs={12}>
                <Card sx={{ boxShadow: 3, borderRadius: 2, margin: "auto" }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Personal Notes
                    </Typography>
                    <Box sx={{ display: "flex", mb: 2, alignItems: "center" }}>
                      <TextField
                        fullWidth
                        multiline
                        label="New Note"
                        variant="outlined"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ ml: 2 }}
                        onClick={addNote}
                      >
                        Add
                      </Button>
                    </Box>
                    <Box sx={{ mb: 2, minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="notes-filter-label">View</InputLabel>
                        <Select
                          labelId="notes-filter-label"
                          value={noteFilter}
                          label="View"
                          onChange={(e) =>
                            setNoteFilter(e.target.value as string)
                          }
                        >
                          {availableSections.map((section: Section) => (
                            <MenuItem key={section.id} value={section.id}>
                              {section.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    {filteredNotes.length > 0 ? (
                      <List>
                        {filteredNotes.map((note) => (
                          <ListItem
                            key={note.id}
                            secondaryAction={
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 2,
                                }}
                              >
                                <IconButton
                                  edge="end"
                                  aria-label="modify"
                                  onClick={() => modifyNote(note.id)}
                                >
                                  <EditIcon />
                                </IconButton>
                                <FormControl size="small">
                                  <Select
                                    value={""}
                                    onChange={(e) =>
                                      changeNoteSection(
                                        note.id,
                                        e.target.value as string
                                      )
                                    }
                                  >
                                    {availableSections.map((section: Section) => (
                                      <MenuItem
                                        key={section.id}
                                        value={section.id}
                                      >
                                        {section.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                <IconButton
                                  edge="end"
                                  aria-label="delete"
                                  onClick={() => deleteNote(note.id)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                            }
                          >
                            <Box
                              sx={{
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                mr: 7,
                              }}
                            >
                              <MarkdownField value={note.note} />
                            </Box>
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No matching notes available.
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          {/* Right Column: Todo List and Section Management */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                maxWidth: 450,
                margin: "auto",
              }}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Todo List
                </Typography>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <TextField
                    fullWidth
                    label="New Task"
                    variant="outlined"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ ml: 2 }}
                    onClick={addTask}
                  >
                    Add
                  </Button>
                </Box>
                <Box sx={{ mb: 2, minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="tasks-filter-label">View</InputLabel>
                    <Select
                      labelId="tasks-filter-label"
                      value={taskFilter}
                      label="View"
                      onChange={(e) => setTaskFilter(e.target.value as string)}
                    >
                      {availableSections.map((section: Section) => (
                        <MenuItem key={section.id} value={section.id}>
                          {section.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                {filteredTasks.length > 0 ? (
                  <List>
                    {filteredTasks.map((task) => (
                      <ListItem
                        key={task.id}
                        secondaryAction={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <IconButton
                              edge="end"
                              aria-label="modify"
                              onClick={() => modifyTask(task.id)}
                            >
                              <EditIcon />
                            </IconButton>
                            <FormControl size="small">
                              <Select
                                value={""}
                                onChange={(e) =>
                                  changeTaskSection(
                                    task.id,
                                    e.target.value as string
                                  )
                                }
                              >
                                {availableSections.map((section: Section) => (
                                  <MenuItem
                                    key={section.id}
                                    value={section.id}
                                  >
                                    {section.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => deleteTask(task.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        }
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={task.task}
                          sx={{
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                            mr: 7,
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No matching tasks available.
                  </Typography>
                )}
              </CardContent>
            </Card>
            <Card sx={{ boxShadow: 3, borderRadius: 2, margin: "auto", mt: 4 }}>
              <CardContent>
                {/* Section Management Panel */}
                <Box>
                  <Typography variant="h6">Manage Sections</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                    <TextField
                      label="New Section"
                      value={newSectionName}
                      onChange={(e) => setNewSectionName(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      sx={{ ml: 2 }}
                      onClick={addNewSection}
                    >
                      Add Section
                    </Button>
                  </Box>
                  {availableSections.map((section: Section) => (
                    <Box
                      key={section.id}
                      sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    >
                      <Typography sx={{ flexGrow: 1 }}>
                        {section.name}
                      </Typography>
                      {section.id !== "all" &&
                        section.id !== "active" &&
                        section.id !== "archived" && (
                          <Button
                            color="error"
                            onClick={() =>
                              handleDeleteSection(section.id, section.name)
                            }
                          >
                            Delete
                          </Button>
                        )}
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
